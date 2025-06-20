import React, { useState, useEffect, useRef } from 'react';
import {askBigModel, destroyWebSocketConnection, createWebSocketConnection} from "../../services/bigModelService";

export default function BigModelQA() {
    const [messages, setMessages] = useState([]); // 聊天记录
    const [input, setInput] = useState('');       // 输入框内容
    const [loading, setLoading] = useState(false);
    const chatEndRef = useRef(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
        // 组件挂载时建立连接
        createWebSocketConnection()
            .catch(console.error);
        // 组件卸载时关闭连接
        return () => {
            destroyWebSocketConnection()
                .catch(console.error);
        }
    }, [messages]);

    async function fetchAnswer(question) {
        return new Promise((resolve) => {
            setTimeout(async () => {
                const result = await askBigModel(question.trim());
                setMessages(result);
            }, 1200);
        });
    }

    // 处理提交，接收事件并阻止默认行为
    const handleSubmit = async (e) => {
        e.preventDefault();
        const trimmed = input.trim();
        if (!trimmed) return;

        setMessages((prev) => [...prev, { sender: 'user', text: trimmed }]);
        setInput('');
        setLoading(true);

        try {
            const answer = await fetchAnswer(trimmed);
            setMessages((prev) => [...prev, { sender: 'assistant', text: answer }]);
        } catch {
            setMessages((prev) => [
                ...prev,
                { sender: 'assistant', text: '抱歉，回答出现错误，请稍后再试。' },
            ]);
        } finally {
            setLoading(false);
        }
    };

    // 回车提交，Shift+Enter换行
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey && !e.ctrlKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <div style={styles.container}>
            <header style={styles.header}>课程选择助手</header>
            <main style={styles.chatContainer}>
                {messages.length === 0 && (
                    <p style={styles.welcome}>请输入您的问题，开始对话吧！😊</p>
                )}
                {messages.map((msg, i) => (
                    <div
                        key={i}
                        style={{
                            ...styles.message,
                            ...(msg.sender === 'user' ? styles.userMsg : styles.assistantMsg),
                        }}
                    >
                        {msg.text.split('\n').map((line, idx) => (
                            <p key={idx} style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
                                {line}
                            </p>
                        ))}
                    </div>
                ))}
                <div ref={chatEndRef} />
            </main>
            <form onSubmit={handleSubmit} style={styles.form}>
                <textarea
                    style={styles.textarea}
                    rows={2}
                    value={input}
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