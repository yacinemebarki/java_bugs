def check_string(s: str):
    stack = []
    pairs = {']': '[', '}': '{', ')': '('}

    lines = s.split("\n")
    for idx, line in enumerate(lines, start=1):
        line_strip = line.strip()
        if line_strip.startswith('.') or line_strip.startswith('='):
            return {"valid": False, "error_line": idx}
        for char in line_strip:
            if char in "[{(":
                stack.append((char, idx)) 
            elif char in "]})":
                if not stack or stack[-1][0] != pairs[char]:
                    error_line = stack[-1][1] if stack else idx
                    return {"valid": False, "error_line": idx}
                stack.pop()
        if "=" in line_strip:
            if any(line_strip.startswith(kw) for kw in ["if", "while", "for"]):
                if "==" not in line_strip:
                    return {"valid": False, "error_line": idx}
            elif "==" not in line_strip and not any(op in line_strip for op in ["=", "+=", "-=", "*=", "/="]):
                return {"valid": False, "error_line": idx}
    if stack:
        return {"valid": False, "error_line": stack[-1][1]}

    return {"valid": True, "error_line": None}
    