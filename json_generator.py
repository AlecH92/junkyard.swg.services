# SWG Junkyard JSON Generator
#
# To run, place the following files, found in the [SWG source code](https://bitbucket.org/swgmasters/swg-src), in ./swg_files:
# `./dsrc/sku.0/sys.server/compiled/game/datatables/crafting/reverse_engineering_junk.tab`
# `./dsrc/sku.0/sys.server/compiled/game/datatables/crafting/reverse_engineering_special_mods.tab`
# `./dsrc/sku.0/sys.server/compiled/game/datatables/item/master_item/master_item.tab`
# `./dsrc/sku.0/sys.shared/compiled/game/datatables/expertise/skill_mod_listing.tab`
#
# Delete the top 2 lines of all of these files, then run `py json_generator.py`

import csv
import json
import itertools

MASTER_ITEM = './swg_files/master_item.tab'
SKILL_NAMES = './swg_files/skill_mod_listing.tab'
JUNK_INDICIES = './swg_files/reverse_engineering_junk.tab'
MODIFIER_DATA = './swg_files/reverse_engineering_special_mods.tab'

BASE_MODS = [
    {
        'n': 'precision_modified',
        'h': 'Precision',
        'r': 1,
        'p': True
    },
    {
        'n': 'strength_modified',
        'h': 'Strength',
        'r': 1,
        'p': True
    },
    {
        'n': 'agility_modified',
        'h': 'Agility',
        'r': 1,
        'p': True
    },
    {
        'n': 'stamina_modified',
        'h': 'Stamina',
        'r': 1,
        'p': True
    },
    {
        'n': 'constitution_modified',
        'h': 'Constitution',
        'r': 1,
        'p': True
    },
    {
        'n': 'luck_modified',
        'h': 'Luck',
        'r': 1,
        'p': True
    }
]

item_name_dict = {}
skill_name_dict = {}
junk_list = []
modifier_list = []

# Fill in missing names
skill_name_dict['combat_critical_hit_reduction']  = 'Critical Hit Reduction'
skill_name_dict['prop_assembly']                  = 'Prop Assembly'
skill_name_dict['exotic_heal_action_reduction']   = 'Heal Action Cost Reduction'
skill_name_dict['commando_devastation']           = 'Devastation'
skill_name_dict['exotic_dodge_reduction']         = 'Dodge Reduction'
skill_name_dict['exotic_parry_reduction']         = 'Parry Reduction'
skill_name_dict['exotic_acid_penetration']        = 'Acid Penetration'
skill_name_dict['exotic_cold_penetration']        = 'Cold Penetration'
skill_name_dict['exotic_heat_penetration']        = 'Heat Penetration'
skill_name_dict['exotic_electricity_penetration'] = 'Electricity Penetration'

with open(MASTER_ITEM, 'r') as master_item_file:
    master_item_reader = csv.reader(master_item_file, delimiter='\t')
    for row in master_item_reader:
        # Format: {name: human-readable-name}
        item_name_dict[row[0]] = row[13]

with open(SKILL_NAMES, 'r') as skill_name_file:
    skill_name_reader = csv.reader(skill_name_file, delimiter='\t')
    for row in skill_name_reader:
        # Format: {name: human-readable-name}
        try:
            skill_name_dict[row[0]] = row[7]
        except IndexError:
            pass

with open(JUNK_INDICIES, 'r') as junk_indicies_file:
    junk_index_reader = csv.reader(junk_indicies_file, delimiter='\t')
    for row in junk_index_reader:
        junk_item = {
            'n': row[2],
            'h': item_name_dict[row[2]],
            'i': int(row[0])
        }
        junk_list.append(junk_item)

with open(MODIFIER_DATA, 'r') as modifier_data_file:
    modifier_data_reader = csv.reader(modifier_data_file, delimiter='\t')
    for row in modifier_data_reader:
        modifier = {
            'n': row[0],
            'h': skill_name_dict[row[0]],
            'm': int(row[1]),
            'M': int(row[2]),
            'r': int(row[3]),
            'p': (4 == len(row))
        }
        modifier_list.append(modifier)

with open('./assets/junk.json', 'w') as combo_file:
    json.dump(junk_list, combo_file, separators=(',', ':'))

with open('./assets/mods.json', 'w') as mod_file:
    json.dump(modifier_list, mod_file, separators=(',', ':'))

with open('./assets/base.json', 'w') as base_file:
    json.dump(BASE_MODS, base_file, separators=(',',':'))
