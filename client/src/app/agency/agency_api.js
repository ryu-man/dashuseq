const route = "/agency"

export class API {
    constructor(token = "") {
        this.token = token
    }
    setToken(token) { this.token = token }

    async create(data) {
        const res = await fetch(route, {
            headers: {
                "Content-Type": "application/json",
                token: this.token,
            },
            method: "POST",
            body: JSON.stringify(data)
        })
        if (res.status === 200) {
            return (await res.json())
        }
        throw new Error("Create agency failed !")
    }

    async readAll() {
        const res = await fetch(route, {
            headers: {
                "Content-Type": "application/json",
                token: this.token,
            },
            method: "GET",
        })
        if (res.status === 200) {
            return (await res.json())
        }
        throw new Error("ReadAll agency failed !")
    }
    async update(id, payload = {}) {
        const res = await fetch(`${route}/${id}`, {
            headers: {
                "Content-Type": "application/json",
                token: this.token,
            },
            method: "PUT",
            body: JSON.stringify(payload)
        })
        if (res.status === 200) {
            return (await res.json())
        }
        throw new Error("Update agency failed !")
    }
    async remove(id) {
        const res = await fetch(`${route}/${id}`, {
            headers: {
                "Content-Type": "application/json",
                token: this.token,
            },
            method: "DELETE",
        })
        if (res.status === 200) {
            return
        }
        throw new Error("Delete agency failed !")
    }

}
