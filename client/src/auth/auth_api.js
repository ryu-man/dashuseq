export default class AuthAPI{
    
    async login(email, password){
        const res = await fetch('/login', {
            headers: {
                "Content-Type": "application/json",
            },
            method:"POST",
            body:JSON.stringify({email, password})
        })
        if(res.status === 200){
            return (await res.json())
        }

        throw new Error('User not found check your credntials')
    }
}