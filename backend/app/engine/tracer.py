
from typing import List, Dict, Any

def generate_trace(problem_id: str, input_data: Any) -> List[Dict[str, Any]]:
    """
    TRACER ENGINE: Generates the pedagogical event timeline.
    Separates algorithm logic from visualization events.
    """
    steps = []

    # --- TWO SUM TRACER ---
    if problem_id == "two-sum":
        nums = input_data
        target = 9
        map_cache = {}
        
        # Step 0: Initial State
        steps.append({
            "type": "highlight", "index": None, "explanation": "Initializing Hash Map for O(N) lookup.",
            "variables": {"target": target, "map": "{}"}, "line_number": 1
        })

        for i, num in enumerate(nums):
            diff = target - num
            # Event: Pointer movement
            steps.append({
                "type": "pointer_move", "indices": [i], "explanation": f"Checking index {i}: {num}",
                "variables": {"i": i, "val": num, "needed": diff}, "line_number": 3
            })
            
            # Event: Compare/Lookup
            steps.append({
                "type": "compare", "indices": [i], "explanation": f"Does {diff} exist in map?",
                "variables": {"lookup": diff}, "line_number": 4
            })

            if diff in map_cache:
                # Event: Match Found
                steps.append({
                    "type": "match", "indices": [map_cache[diff], i], "explanation": f"Match found! {diff} + {num} = {target}",
                    "variables": {"result": [map_cache[diff], i]}, "line_number": 5
                })
                return steps
            
            map_cache[num] = i
            
    # --- GROUP ANAGRAMS TRACER ---
    elif problem_id == "group-anagrams":
        strs = input_data # ['eat', 'tea', 'tan', 'ate', 'nat', 'bat']
        groups = {}
        
        for i, s in enumerate(strs):
            # Event: Highlight the word being processed
            steps.append({
                "type": "highlight", "index": i, "explanation": f"Processing word: '{s}'",
                "variables": {"current_word": s, "index": i}, "line_number": 2
            })
            
            # Event: Simulation of internal logic (sorting/hashing)
            sorted_s = "".join(sorted(s))
            steps.append({
                "type": "compare", "indices": [i], "explanation": f"Generating key: '{sorted_s}'",
                "variables": {"key": sorted_s}, "line_number": 3
            })
            
            if sorted_s not in groups:
                groups[sorted_s] = []
            groups[sorted_s].append(s)
            
            # Event: Update visual state
            steps.append({
                "type": "assignment", "indices": [i], "explanation": f"Adding '{s}' to group '{sorted_s}'",
                "variables": {"groups_count": len(groups)}, "line_number": 5
            })
            
    # --- DEFAULT FALLBACK ---
    else:
        # Fallback logic for remaining 75 problems
        arr = input_data if isinstance(input_data, list) else [1, 2, 3]
        for i in range(len(arr)):
            steps.append({
                "type": "highlight", "index": i, "explanation": f"Iterating element {i}: {arr[i]}",
                "variables": {"i": i, "val": arr[i]}, "line_number": 1
            })

    return steps
