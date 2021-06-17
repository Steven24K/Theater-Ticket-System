import { LoginForm } from "./login.state"

        
        interface directorLogin {
            role: "director"
            Name: string
            Password: string
        }

        
        interface adminLogin {
            role: "admin"
            Name: string
            Password: string
        }

        
        interface resellerLogin {
            role: "reseller"
            Name: string
            Password: string
        }

        
        interface actorLogin {
            role: "actor"
            Name: string
            Password: string
        }

        

        
        type LoginBody = directorLogin | adminLogin | resellerLogin | actorLogin | { role: "none" }
        

        export const LoginDatatoBody = (data: LoginForm): LoginBody => {
            
            if (data.role == 'director') {
                return { role: 'director', Password: data.password, Name: data.username }
            }

            
            if (data.role == 'admin') {
                return { role: 'admin', Password: data.password, Name: data.username }
            }

            
            if (data.role == 'reseller') {
                return { role: 'reseller', Password: data.password, Name: data.username }
            }

            
            if (data.role == 'actor') {
                return { role: 'actor', Password: data.password, Name: data.username }
            }

            

        
            return { role: 'none' }
        }