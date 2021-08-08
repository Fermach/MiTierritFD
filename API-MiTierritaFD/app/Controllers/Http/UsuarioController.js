'use strict'

const Usuario = use ('App/Models/Usuario');

class UsuarioController {
     
     
       async serve({response}){
        //  console.log("1");
          return response.json({"API": 'Servidor en escucha!'});
   
       }
       
       async login({request,response,auth}){
   
              const user= request.all();
              //   console.log("2");
              const logged = await auth.attempt(user.correo, user.password, true);
              
              return response.json(logged);
   
       }

       async getUsuarios({response,auth}){
       
        await auth.getUser();
            
           const usuarios= await Usuario
           .query()
           .select('id')
           .select('correo')
           .select('tipo_id')
           .select('nombre')
           .select('apellidos')
           .select('direccion')
           .select('ciudad')
           .select('provincia')
           .select('pais')
           .select('nacionalidad_id')
           .with('nacionalidad')
           .with('tipoUsuario')
           .where('activo', 1)
           .fetch()
   
           if (JSON.stringify(usuarios) != "[]"){
         
               return response.json({Error : "False", Message: " Usuarios obtenidos con éxito!", Usuarios : usuarios});
   
           }else{
          
               return response.json({Error : "True", Message: " No fue posible obtener el listado de usuarios!", Usuarios : usuarios});       
         
            }      

        }
   
       async getUsuarioPorId({response,params,auth}){
   
           await auth.getUser();
        
           const usuarioObtenido= await Usuario
           .query()
           .select('id')
           .select('correo')
           .select('nombre')
           .select('tipo_id')
           .select('nacionalidad_id')
           .with('nacionalidad')
           .select('apellidos')
           .select('direccion')
           .select('ciudad')
           .select('provincia')
           .select('pais')
           .where('id', params.id)
           .fetch()
   
           if (JSON.stringify(usuarioObtenido) != "[]"){
     
               return response.json({Error : "False", Message: "Usuario obtenido con éxito!", Usuario : usuarioObtenido});
     
           }else{
          
               return response.json({Error : "True", Message: "No fue posible encontrar el usuario con el id seleccionado!", Usuario: usuarioObtenido});
           }
           
       
        }
   
   
       async registro({request,response, auth}){
   
          //await auth.getUser();
   
           const userInstance= new Usuario();
           const user= request.all();
   
           userInstance.correo = user.correo;
           userInstance.nombre= user.nombre;
           userInstance.apellidos= user.apellidos;
           userInstance.tipo_id= user.tipo;
           userInstance.password= user.password;
           userInstance.nacionalidad_id= user.nacionalidad;
           userInstance.provincia= user.provincia;
           userInstance.pais= user.pais;    
           userInstance.ciudad= user.ciudad;    
           userInstance.direccion= user.direccion;  
        
           console.log(JSON.stringify(userInstance));
   
           try{
               await userInstance.save();
               return response.json({Error: "False", Message: "Usuario actualizado con éxito! "});
           }catch (error) {
            console.error(error);
              return response.json({Error: "True", Message: "No fue posible añadir el usuario! "});
           }
       
       }
   
       async actualizarUsuario({request,params,response,auth}){
           await auth.getUser();
   
           const usuario =await Usuario.find(params.id)
        
           if(usuario != null){
      
            const usuarioNuevo = request.all();
            usuario.correo = usuarioNuevo.correo;
            usuario.nombre= usuarioNuevo.nombre;
            usuario.apellidos= usuarioNuevo.apellidos;
            usuario.tipo_id= usuarioNuevo.tipo;
            usuario.password= usuarioNuevo.password;
            usuario.provincia= usuarioNuevo.provincia;
            usuario.pais= usuarioNuevo.pais;   
            usuario.nacionalidad_id= usuarioNuevo.nacionalidad; 
            usuario.ciudad= usuarioNuevo.ciudad;    
            usuario.direccion= usuarioNuevo.direccion;  
            usuario.password= usuarioNuevo.password;  

               await usuario.save();
   
               return response.json({Error: "False", Message: "Usuario actualizado con éxito! "});
           }else{
          
               return response.json({Error: "True", Message:"No fue posible encontrar el usuario con el id seleccionado!"})
         }
       }
   
       async deshabilitarUsuario({request,params,response,auth}){
   
           //console.log("2");
           await auth.getUser();
   
           const usuario =await Usuario.find(params.id)
        
           if(usuario != null){
               
               usuario.activo= false;
               await usuario.save();
   
               return response.json({Error: "False", Message: "Usuario actualizado con éxito! "});
           }else{
          
               return response.json({Error: "True", Message:"No fue posible encontrar el usuario con el id seleccionado!"})
         }
       }
   
       async habilitarUsuario({request,params,response,auth}){
   
          // console.log("2");
           await auth.getUser();
   
           const usuario =await Usuario.find(params.id)
        
           if(usuario != null){
           
               usuario.activo= true;
               await usuario.save();
   
               return response.json({Error: "False", Message: "Usuario actualizado con éxito! "});
           }else{
          
               return response.json({Error: "True", Message:"No fue posible encontrar el usuario con el id seleccionado!"})
         }
       }
   
}

module.exports = UsuarioController
