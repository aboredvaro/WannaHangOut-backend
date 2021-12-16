-- Generar en VBA emparejamientos de entityToActivity (id_entity, id_activity)
Sub escribe()
Dim id_entity As Integer
    id_entity = 11
Dim id_activity As Integer
    id_activity = 10
Dim fila As Integer
    fila = 1
For i = 1 To id_entity
    For j = 1 To id_activity
        ActiveSheet.Cells(fila, 1).Value = "(" & i & ", " & j & "),"
        fila = fila + 1
    Next j
Next i
End Sub


-- Generar en VBA emparejamientos de tags_ent (id_tags, id_entity)
-- Genera duplicados, que hay que quitar a mano
Sub escribe()
Dim id_tags As Integer
    id_tags = 14
Dim id_entity As Integer
    id_entity = 15
Dim fila As Integer
    fila = 1
For i = 1 To id_tags
    For j = 1 To id_entity
        ActiveSheet.Cells(fila, 1).Value = "(" & Int((id_tags * Rnd) + 1) & ", " & j & "),"
        fila = fila + 1
    Next j
Next i
End Sub


-- Generar en VBA emparejamientos de tags_ent (id_tags, id_activity)
-- Genera duplicados, que hay que quitar a mano
Sub escribe()
Dim id_tags As Integer
    id_tags = 14
Dim id_activity As Integer
    id_activity = 10
Dim fila As Integer
    fila = 1
For i = 1 To id_tags
    For j = 1 To id_activity
        ActiveSheet.Cells(fila, 1).Value = "(" & Int((id_tags * Rnd) + 1) & ", " & j & "),"
        fila = fila + 1
    Next j
Next i
End Sub



---------------------------------
{
    "type": "user",
    "path": [
        "C:\\Users\\carme\\OneDrive\\Escritorio\\pruebas\\01.jpg",
        "C:\\Users\\carme\\OneDrive\\Escritorio\\pruebas\\02.png",
        "C:\\Users\\carme\\OneDrive\\Escritorio\\pruebas\\03.webp",
        "C:\\Users\\carme\\OneDrive\\Escritorio\\pruebas\\04.png",
        "C:\\Users\\carme\\OneDrive\\Escritorio\\pruebas\\05.jpg",
        "C:\\Users\\carme\\OneDrive\\Escritorio\\pruebas\\06.png",
        "C:\\Users\\carme\\OneDrive\\Escritorio\\pruebas\\07.png",
        "C:\\Users\\carme\\OneDrive\\Escritorio\\pruebas\\08.png",
        "C:\\Users\\carme\\OneDrive\\Escritorio\\pruebas\\09.png",
        "C:\\Users\\carme\\OneDrive\\Escritorio\\pruebas\\10.jpg",
        "C:\\Users\\carme\\OneDrive\\Escritorio\\pruebas\\11.jpg",
        "C:\\Users\\carme\\OneDrive\\Escritorio\\pruebas\\12.webp",
        "C:\\Users\\carme\\OneDrive\\Escritorio\\pruebas\\13.jpg",
        "C:\\Users\\carme\\OneDrive\\Escritorio\\pruebas\\14.jpg",
        "C:\\Users\\carme\\OneDrive\\Escritorio\\pruebas\\15.jpg"
    ]
}