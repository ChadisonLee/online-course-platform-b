import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import courseService from '../../services/courseService'; // 你需要实现的API调用
import adminService from '../../services/adminService'; // 获取类别接口
import Loading from '../../components/common/Loading';

export default function CourseEdit() {
    const { id } = useParams(); // 课程ID，为undefined表示新建
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]); // 类别列表
    const [course, setCourse] = useState({
        title: '',
        description: '',
        categoryId: '', // 选择的类别ID
        newCategory: '', // 新类别名称
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);

    // 加载类别和课程详情
    useEffect(() => {
        Promise.all([
            adminService.getCategoryID(),
            id ? adminService.getCourseById(id) : Promise.resolve(null),
        ])
            .then(([cats, courseData]) => {
                setCategories(cats);
                if (courseData) {
                    setCourse({
                        title: courseData.title || '',
                        description: courseData.description || '',
                        categoryId: courseData.categoryId || '',
                        newCategory: '',
                    });
                }
            })
            .catch(err => {
                console.error('加载数据失败', err);
                setError('加载数据失败');
            })
            .finally(() => setLoading(false));
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCourse(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        const categoryName = course.newCategory.trim() || categories.find(c => c.id === course.categoryId)?.name;
        if (!categoryName) {
            alert('请选择或输入类别');
            return;
        }

        const payload = {
            title: course.title,
            description: course.description,
            categoryName,
        };

        setSaving(true);
        const request = id ? courseService.updateCourse(id, payload) : courseService.createCourse(payload);

        request
            .then(() => {
                alert('保存成功');
                navigate('/admin/courses');
            })
            .catch(err => {
                console.error('保存失败', err);
                alert('保存失败，请稍后重试');
            })
            .finally(() => setSaving(false));
    };

    if (loading) return <Loading />;

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>{id ? '编辑课程' : '新建课程'}</h1>
            {error && <p style={styles.error}>{error}</p>}

            <div style={styles.formGroup}>
                <label style={styles.label}>课程标题 *</label>
                <input
                    style={styles.input}
                    value={course.title}
                    onChange={handleChange}
                    name="title"
                    required
                />
            </div>

            <div style={styles.formGroup}>
                <label style={styles.label}>课程描述</label>
                <textarea
                    style={{ ...styles.input, height: 100, resize: 'vertical' }}
                    value={course.description}
                    onChange={handleChange}
                    name="description"
                />
            </div>

            <div style={styles.formGroup}>
                <label style={styles.label}>类别</label>
                <select
                    style={styles.input}
                    value={course.categoryId}
                    onChange={handleChange}
                    name="categoryId"
                >
                    <option value="">请选择类别</option>
                    {categories.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                </select>
            </div>

            <div style={styles.formGroup}>
                <label style={styles.label}>或输入新类别</label>
                <input
                    style={styles.input}
                    placeholder="输入新类别名称"
                    value={course.newCategory}
                    onChange={handleChange}
                    name="newCategory"
                />
            </div>

            <div style={styles.buttonGroup}>
                <button
                    style={styles.saveButton}
                    onClick={handleSubmit}
                    disabled={saving}
                >
                    {saving ? '保存中...' : '保存'}
                </button>
                <button
                    style={styles.cancelButton}
                    onClick={() => navigate('/admin/courses')}
                    disabled={saving}
                >
                    取消
                </button>
            </div>
        </div>
    );
}

const styles = {
    container: {
        maxWidth: 600,
        margin: '40px auto',
        padding: 24,
        backgroundColor: '#fff',
        borderRadius: 12,
        boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    title: {
        fontSize: '2.2rem',
        fontWeight: '700',
        marginBottom: 24,
        textAlign: 'center',
    },
    formGroup: {
        marginBottom: 16,
    },
    label: {
        display: 'block',
        marginBottom: 8,
        fontWeight: '600',
    },
    input: {
        width: '100%',
        padding: '10px 12px',
        borderRadius: 6,
        border: '1.5px solid #ccc',
        outline: 'none',
        fontSize: '1rem',
    },
    buttonGroup: {
        marginTop: 32,
        display: 'flex',
        justifyContent: 'space-between',
    },
    saveButton: {
        padding: '10px 24px',
        backgroundColor: '#357ae8',
        border: 'none',
        borderRadius: 6,
        color: '#fff',
        fontWeight: '700',
        fontSize: '1rem',
        cursor: 'pointer',
    },
    cancelButton: {
        padding: '10px 24px',
        backgroundColor: '#aaa',
        border: 'none',
        borderRadius: 6,
        color: '#fff',
        fontWeight: '700',
        fontSize: '1rem',
        cursor: 'pointer',
    },
    error: {
        color: '#e74c3c',
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 16,
    },
};