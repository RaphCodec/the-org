import random

class Node:
    def __init__(self, value):
        self.value = value
        self.children = []

def generate_random_hierarchy(depth, max_children):
    if depth == 0:
        return None

    root = Node(random.randint(1, 100))
    num_children = random.randint(0, max_children)

    for _ in range(num_children):
        child = generate_random_hierarchy(depth - 1, max_children)
        if child:
            root.children.append(child)

    return root

def print_hierarchy(node, level=0):
    if node:
        print(' ' * level + str(node.value))
        for child in node.children:
            print_hierarchy(child, level + 1)

# Generate a random hierarchy with a maximum depth of 3 and 2 children per node
hierarchy = generate_random_hierarchy(3, 2)
print_hierarchy(hierarchy)