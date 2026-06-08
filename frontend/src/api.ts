const API_BASE_URL = "http://localhost:8080/api";

async function handleResponse(response, skipRedirect = false) {
    if (response.status === 401 && !skipRedirect) {
        localStorage.removeItem('adminToken');
        window.location.href = '/admin';
        throw new Error("Session expired. Please login again.");
    }
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.error || "Request failed");
    }
    return data;
}

export async function login(username, password) {
    const response = await fetch(`${API_BASE_URL}/admin/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
    });

    return handleResponse(response, true);
}

// --- Categories ---

export async function getCategories() {
    const response = await fetch(`${API_BASE_URL}/categories`);
    return handleResponse(response);
}

export async function createCategory(token, category) {
    const response = await fetch(`${API_BASE_URL}/admin/categories`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    });
    return handleResponse(response);
}

export async function updateCategory(token, id, category) {
    const response = await fetch(`${API_BASE_URL}/admin/categories/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    });
    return handleResponse(response);
}

export async function deleteCategory(token, id) {
    const response = await fetch(`${API_BASE_URL}/admin/categories/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return handleResponse(response);
}

// --- SubCategories ---

export async function getSubCategories(category_id) {
    const url = category_id ? `${API_BASE_URL}/subcategories?category_id=${category_id}` : `${API_BASE_URL}/subcategories`;
    const response = await fetch(url);
    return handleResponse(response);
}

export async function getSubCategory(id) {
    const response = await fetch(`${API_BASE_URL}/subcategories/${id}`);
    return handleResponse(response);
}

export async function createSubCategory(token, subcategory) {
    const response = await fetch(`${API_BASE_URL}/admin/subcategories`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(subcategory)
    });
    return handleResponse(response);
}

export async function updateSubCategory(token, id, subcategory) {
    const response = await fetch(`${API_BASE_URL}/admin/subcategories/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(subcategory)
    });
    return handleResponse(response);
}

export async function deleteSubCategory(token, id) {
    const response = await fetch(`${API_BASE_URL}/admin/subcategories/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return handleResponse(response);
}

// --- Articles ---

export async function getArticles(subcategory_id) {
    const url = subcategory_id ? `${API_BASE_URL}/articles?subcategory_id=${subcategory_id}` : `${API_BASE_URL}/articles`;
    const response = await fetch(url);
    return handleResponse(response);
}

export async function createArticle(token, article) {
    const response = await fetch(`${API_BASE_URL}/admin/articles`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(article)
    });
    return handleResponse(response);
}

export async function updateArticle(token, id, article) {
    const response = await fetch(`${API_BASE_URL}/admin/articles/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(article)
    });
    return handleResponse(response);
}

export async function deleteArticle(token, id) {
    const response = await fetch(`${API_BASE_URL}/admin/articles/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return handleResponse(response);
}

// --- SubArticles ---

export async function getSubArticles(article_id) {
    const url = article_id ? `${API_BASE_URL}/subarticles?article_id=${article_id}` : `${API_BASE_URL}/subarticles`;
    const response = await fetch(url);
    return handleResponse(response);
}

export async function createSubArticle(token, subarticle) {
    const response = await fetch(`${API_BASE_URL}/admin/subarticles`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(subarticle)
    });
    return handleResponse(response);
}

export async function updateSubArticle(token, id, subarticle) {
    const response = await fetch(`${API_BASE_URL}/admin/subarticles/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(subarticle)
    });
    return handleResponse(response);
}

export async function deleteSubArticle(token, id) {
    const response = await fetch(`${API_BASE_URL}/admin/subarticles/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return handleResponse(response);
}

// --- Uploads ---

export async function uploadImage(token, file) {
    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch(`${API_BASE_URL}/admin/upload`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: formData
    });

    return handleResponse(response);
}

