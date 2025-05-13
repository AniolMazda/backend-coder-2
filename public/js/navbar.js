const optsUser = document.querySelector("#opts-user")

const userLinks = async () => {
    try {
        function cookieExiste(nombreCookie) {
            const cookies = document.cookie;
            if (!cookies || cookies.length === 0) {
                return false;
            }
            const cookieRegex = new RegExp(`(^|;\\s*)${nombreCookie}=([^;]+)(;|$)`);
            const match = cookies.match(cookieRegex);
            return match !== null;
        }
        const cookieU = cookieExiste("token")
        if(!cookieU){
            optsUser.innerHTML = `
                <li><a href="/register">Register</a></li>
                <li><a class="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" href="/login">Login</a></li>
            `
        }else{
            optsUser.innerHTML = `
                <li><a href="/profile">Profile</a></li>
                <li><a href="/cart">Cart</a></li>
                <li><button class="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" id="signout">Signout</button></li>
            `
            document.querySelector("#signout").addEventListener("click", async () => {
                try {
                    const opts = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    }
                    }
                    const url = "/api/auth/signout"
                    await fetch(url, opts)
                    localStorage.removeItem("token")
                    location.replace("/")
                } catch (error) {
                    console.error(error)
                }
            })
        }
    } catch (error) {
        console.error(error)
    }
}

userLinks()