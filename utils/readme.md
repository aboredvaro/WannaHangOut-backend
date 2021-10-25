PARÁMETROS NECESARIOS PARA INSERTAR UNA:

* ACTIVITY     --> /api/createNewActivity
     NECESARIOS
          - id_entity_creator
          - title
          - description
          - seats
          - price
          - dateAct
          - min_duration
          - tags_act          <-- Debe tener el formato: 1,2,3,4
          - codPos
          - location
          - direction
          - latitude
          - longitude
     NO NECESARIOS
          - deleted           <-- Por defecto es 0, ya que si se crea, no queremos que se cree "eliminado"
          - id_address        <-- Se genera sola, a partir del resto de parámetros 
          - id_province       <-- Se genera sola, a partir de CodPos
     RETORNO
          - id_activity       <-- Se genera sola al insertar, es lo que devuelve

* ADDRESS      --> /api/createNewAddress
     NECESARIOS
          - codPos
          - location
          - direction
          - latitude
          - longitude
     NO NECESARIOS
          - id_province       <-- Se genera sola, a partir de CodPos
     RETORNO
          - id_address        <-- Se genera sola al insertar, es lo que devuelve

* ENTITY       --> /api/createNewEntity
     NECESARIOS
          - id_role
          - id_address
          - nick
          - name
          - surname
          - description
          - mail
          - phone
          - pass
          - avatar
          - tags_ent          <-- Debe tener el formato: 1,2,3,4
          - codPos
          - location
          - direction
          - latitude
          - longitude
     NO NECESARIOS
          - sha256            <-- Se genera sola, a partir de mail
          - deleted           <-- Por defecto es 0, ya que si se crea, no queremos que se cree "eliminado"
          - id_address        <-- Se genera sola, a partir del resto de parámetros 
          - id_province       <-- Se genera sola, a partir de CodPos
     RETORNO
          - id_entity         <-- Se genera sola al insertar, es lo que devuelve


PARÁMETROS NECESARIOS PARA ACTUALIZAR (marcados con '>' los que cambian con respecto a la inserción):

* ACTIVITY     --> /api/updateActivity
     NECESARIOS
          > id_activity
          - id_entity_creator
          - title
          - description
          - seats
          - price
          - dateAct
          - min_duration
          - tags_act          <-- Debe tener el formato: 1,2,3,4
          > deleted           
          > id_address        
          - codPos
          - location
          - direction
          - latitude
          - longitude
     NO NECESARIOS
          - id_province       <-- Se genera sola, a partir de CodPos
     RETORNO
          - Boolean

* ADDRESS      --> /api/updateAddress
     NECESARIOS
          - codPos
          - location
          - direction
          - latitude
          - longitude
     NO NECESARIOS
          - id_province       <-- Se genera sola, a partir de CodPos
          - id_address        <-- Se genera sola al insertar, es lo que devuelve
     RETORNO
          - Boolean

* ENTITY       --> /api/updateEntity
     NECESARIOS
          > id_entity
          - id_role
          - id_address
          - nick
          - name
          - surname
          - description
          - mail
          - phone
          - pass
          - avatar
          - tags_ent          <-- Debe tener el formato: 1,2,3,4
          > deleted
          > id_address 
          - codPos
          - location
          - direction
          - latitude
          - longitude
     NO NECESARIOS
          - sha256            <-- Se genera sola, a partir de mail
          - id_province       <-- Se genera sola, a partir de CodPos
     RETORNO
          - Boolean