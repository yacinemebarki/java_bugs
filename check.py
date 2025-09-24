def check_string(s: str) -> bool:
    stack = []
    pairs = {']': '[', '}': '{',')': '('}
    if s.strip().startswith('.'):
        return False
    if s.strip().startswith('='):
        return False
    for char in s:
        if char in "[{(":
            stack.append(char)
        elif char in "]})":
            if not stack or stack[-1]!=pairs[char]:
                return False
            stack.pop()
    lines = s.split("\n")
    for line in lines:
        line_strip = line.strip()
        if "=" in line_strip:
            if any(line_strip.startswith(kw) for kw in ["if", "while", "for"]):
                if "==" not in line_strip:
                    return False
            if "==" not in line_strip and not any(op in line_strip for op in ["=", "+=", "-=", "*=", "/="]):    
                return False        
    return len(stack)==0
print(check_string('''print("Hello World")'''))
print(check_string("if (x)"))    
print(check_string("if (x == 5)"))  
print(check_string("a = 10"))          
print(check_string("=value"))      