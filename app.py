from flask import Flask,jsonify
from flask_mysqldb import MySQL
from config import config

app=Flask(__name__)

conexion = MySQL(app)

@app.route('/personal')
def listarpersonal():
    try:
        cursor = conexion.connection.cursor()
        sql = "SELECT idnew_table, Nombre, ApellidoP, IdRol, Contrasena FROM t_personal"
        cursor.execute(sql)
        datos = cursor.fetchall()
        personas=[]
        for fila in datos:
            persona = {'id':fila[0],'Nombre':fila[1],'ApellidoP':fila[2],'IdRol':fila[3],'Contrasena':fila[4]}
            personas.append(persona)
        return jsonify({'personas':personas,'mensaje':"Personas listadas"})
    except Exception as ex:
        print(f"Error de base de datos: {ex}")
        return "Error al listar personal"
    
def pagina_no_encontrada(error):
    return "<h1>La pagina no existe</h1>"


    
if __name__ == '__main__':
    app.config.from_object(config['development'])
    app.register_error_handler(404,pagina_no_encontrada)
    app.run()
