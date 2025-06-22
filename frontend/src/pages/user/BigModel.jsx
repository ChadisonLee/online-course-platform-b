import React, {useEffect, useRef, useState} from 'react';
import {askBigModelHttp, createBigModelWebSocket} from '../../services/bigModelService';


export default function BigModelQA() {
    const [messages, setMessages] = useState([]); // 聊天记录
    const [input, setInput] = useState('');
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(false);
    const chatEndRef = useRef(null);
    const inputRef = useRef(null);
    const wsRef = useRef(null); // WebSocket实例引用

    // 滚动到底部
    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    // 初始化 userId，只执行一次
    useEffect(() => {
        const userStr = localStorage.getItem('user');
        if (!userStr) {
            alert('请先登录');
            setLoading(false);
            return;
        }
        const user = JSON.parse(userStr);
        if (!user?.id) {
            alert('请先登录');
            setLoading(false);
            return;
        }
        setUserId(user.id);
    }, []);

    // 建立 WebSocket 连接，只执行一次
    useEffect(() => {
        if (!userId) return;

        wsRef.current = createBigModelWebSocket(userId, (data) => {
            // 消息处理逻辑
            // 这里假设服务器发回的 data 是字符串消息，也可能是JSON对象
            if (typeof data === 'string') {
                setMessages(prev => [...prev, { role: 'assistant', content: data }]);
            } else if (typeof data === 'object' && data !== null) {
                setMessages(prev => [...prev, { role: 'assistant', content: data.content || '[无内容]' }]);
            }
        });

        return () => {
            // 组件卸载时关闭 WebSocket
            wsRef.current?.close();
        };
    }, [userId]);

    // 消息更新时滚动到底部 & 输入框聚焦
    useEffect(() => {
        scrollToBottom();
        inputRef.current?.focus();
    }, [messages]);

// 发送问题，获取任务ID
    async function fetchAnswer(question) {
        try {
            // 不在这里处理完整回答，由WebSocket监听推送结果
            return await askBigModelHttp(userId, question.trim());
        } catch (error) {
            console.error('提交问题失败:', error);
            setMessages(prev => [
                ...prev,
                { role: 'assistant', content: '抱歉，问题提交失败，请在登录状态下尝试。' },
            ]);
            return null;
        }finally {
            setLoading(false);  // 任务完成后，无论成功失败，都重置 loading
        }
    }

    // 处理提交
    const handleSubmit = async e => {
        e.preventDefault();
        const trimmed = input.trim();
        if (!trimmed) return;

        setMessages(prev => [...prev, { role: 'user', content: trimmed }]);
        setInput('');
        setLoading(true);

        await fetchAnswer(trimmed);
    };

    // 支持回车提交，Shift+Enter换行
    const handleKeyDown = e => {
        if (loading) return;
        if (e.key === 'Enter' && !e.shiftKey && !e.ctrlKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <div style={styles.container}>
            <header style={styles.header}>课程选择助手</header>
            <main style={styles.chatContainer}>
                {messages.length === 0 && <p style={styles.welcome}>请输入您的问题，开始对话吧！😊</p>}
                {messages.map((msg, i) => {
                    const content = msg.content || '';
                    return (
                        <div
                            key={i}
                            style={{
                                ...styles.message,
                                ...(msg.role === 'user' ? styles.userMsg : styles.assistantMsg),
                            }}
                        >
                            {content.split('\n').map((line, idx) => (
                                <p key={idx} style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
                                    {line}
                                </p>
                            ))}
                        </div>
                    );
                })}
                <div ref={chatEndRef} />
            </main>
            <form onSubmit={handleSubmit} style={styles.form}>
        <textarea
            style={styles.textarea}
            rows={2}
            value={input}
            ref={inputRef}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="请输入您的问题，按回车发送，Shift+Enter换行"
            disabled={loading}
        />
                <button type="submit" style={styles.button} disabled={loading || !input.trim()}>
                    {loading ? '生成中...' : '发送'}
                </button>
            </form>
        </div>
    );
}

const styles = {
    container: {
        maxWidth: 720,
        margin: '10px auto',
        padding: 24,
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        display: 'flex',
        flexDirection: 'column',
        height: '85vh',
        border: '1px solid #ddd',
        borderRadius: 14,
        backgroundColor: '#ffffff',
        boxShadow: '0 12px 30px rgba(50,50,93,.1), 0 4px 15px rgba(0,0,0,.07)',
    },
    header: {
        fontSize: 28,
        fontWeight: 700,
        textAlign: 'center',
        padding: '16px 0',
        backgroundColor: '#f0f4ff',
        borderBottom: '2px solid #357ae8',
        color: '#357ae8',
        letterSpacing: '1.2px',
    },
    chatContainer: {
        flex: 1,
        overflowY: 'auto',
        padding: 20,
        backgroundColor: '#f0f4ff',
        borderRadius: 12,
        marginBottom: 16,
        boxShadow: 'inset 0 0 10px rgba(53, 122, 232, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
    },
    welcome: {
        color: '#7a85c9',
        textAlign: 'center',
        marginTop: 30,
        fontSize: 16,
    },
    message: {
        maxWidth: '75%',
        padding: '14px 20px',
        borderRadius: 20,
        lineHeight: 1.5,
        fontSize: 17,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        wordBreak: 'break-word',
        whiteSpace: 'pre-wrap',
    },
    userMsg: {
        backgroundColor: '#a8d0c9',
        color: '#1e3a34',
        alignSelf: 'flex-end',
        borderRadius: '20px 20px 0 20px',
        fontWeight: '600',
    },
    assistantMsg: {
        backgroundColor: '#e1e8ff',
        color: '#2c3e50',
        alignSelf: 'flex-start',
        borderRadius: '20px 20px 20px 0',
        fontWeight: '500',
    },
    form: {
        display: 'flex',
        gap: 10,
    },
    textarea: {
        flex: 1,
        resize: 'vertical',
        padding: 16,
        fontSize: 16,
        borderRadius: 12,
        border: '2px solid #357ae8',
        outline: 'none',
        fontFamily: 'inherit',
        transition: 'border-color 0.3s ease',
        boxShadow: '0 4px 10px rgba(53, 122, 232, 0.15)',
    },
    button: {
        minWidth: 100,
        fontWeight: 700,
        fontSize: 17,
        borderRadius: 12,
        border: 'none',
        backgroundColor: '#357ae8',
        color: '#fff',
        cursor: 'pointer',
        userSelect: 'none',
        boxShadow: '0 6px 12px rgba(53, 122, 232, 0.35)',
        transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
    },
};