import React, { useEffect, useState } from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import courseService from '../../services/courseService'; // 你需要实现的API调用
import adminService, {editCourse} from '../../services/adminService'; // 获取类别接口
import Loading from '../../components/common/Loading';

export default function CourseEdit() {
    const location = useLocation();
    const id = location.state?.courseId;
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
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
            adminService.getCategory(),
            id ? adminService.getCourseById(id) : Promise.resolve(null),
        ])
            .then(([cats, courseData]) => {
                // 转换 cats 格式
                const formattedCategories = cats.map(item => {
                    const id = Number(Object.keys(item)[0]);
                    const name = item[id];
                    return { id, name };
                });

                setCategories(formattedCategories);
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
        const categoryIdStr = course.categoryId;
        const selectedCategory = categories.find(c => c.id === Number(categoryIdStr));
        const categoryName = course.newCategory.trim() || (selectedCategory?.name);
        if (!categoryName) {
            alert('请选择或输入类别');
            return;
        }

        const payload = {
            id: id,
            title: course.title,
            description: course.description,
            categoryId: categoryIdStr ? Number(categoryIdStr) : null,
            categoryName: categoryName,
        };
        console.log('payload', payload);

        setSaving(true);
        const request = id ? adminService.editCourse(payload) : adminService.createCourse(payload);

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
                    style={{...styles.input, height: 100, resize: 'vertical'}}
                    value={course.description}
                    onChange={handleChange}
                    name="description"
                />
            </div>

            <div style={styles.formGroup}>
                <label style={styles.label}>类别</label>
                <select
                    value={course.categoryId}
                    onChange={handleChange}
                    style={styles.input}
                    name="categoryId"
                >
                    {categories.map(c => (
                        <option key={c.id} value={c.id}>
                            {c.name}
                        </option>
                    ))}
                    <option value="new">+ 新建类别</option>
                </select>
            </div>

            {/* 只有当选择了“新建类别”时，显示输入框 */}
            {course.categoryId === 'new' && (
                <div style={styles.formGroup}>
                    <label style={styles.label}>请输入新类别名称</label>
                    <input
                        style={styles.input}
                        placeholder="新类别名称"
                        value={course.newCategory}
                        onChange={handleChange}
                        name="newCategory"
                    />
                </div>
            )}

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