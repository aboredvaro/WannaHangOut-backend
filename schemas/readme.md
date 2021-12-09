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