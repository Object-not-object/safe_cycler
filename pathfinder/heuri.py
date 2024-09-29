import math

surface_translate = {
    "asphalt": 4,
    "sett": 10,
    "paving_stones": 6,
    "unknown": 12,
    "cobblestone": 6,
    "paved": 5,
    "compacted": 7,
    "gravel": 8,
    "concrete": 4,
    "ground": 10,
    "concrete:plates": 5,
    "grass_paver": 8,
}

PROC_CONST = 80

def heuri(
    max_speed,
    is_bicycle,
    surface_type,
    lanes
) -> int:
    st_weight = surface_translate[surface_type]
    bt_weight = 12 if is_bicycle == "yes" else -6
    ms_weight = 10 if int(max_speed) == 0 else math.ceil(int(max_speed)*0.3)
    la_weight = -(int(lanes)*2)
    
    return (st_weight + bt_weight + ms_weight + la_weight) / PROC_CONST
