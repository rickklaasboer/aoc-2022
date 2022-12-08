f = open('data.txt')
lst = f.read().split('\n')

directories = {}
directory_list = []
change_directory = ''

for x in lst:
    if '$ cd' in x and '..' not in x:
        dir = x.removeprefix('$ cd ')
        change_directory += dir
        if change_directory not in directories:
            directories[change_directory] = []
        directory_list.append(dir)
    elif '$ cd' in x and '..' in x:
        change_directory = change_directory.removesuffix(directory_list[len(directory_list) - 1])
        print(directory_list.pop(len(directory_list) - 1))
    elif '$ cd' not in x and '$ ls' not in x:
        if 'dir' in x:
            dir = x.removeprefix('dir ')
            directories[change_directory + dir] = []
        else:
            (size, name) = x.split()
            directories[change_directory].append((int(size), name))

total_size_dict = {directory: 0 for directory in directories}

for directory in directories:
    for item in directories[directory]:
        if type(item) is tuple:
            total_size_dict[directory] += item[0]

for key in total_size_dict.keys():
    for directory in directories:
        if key in directory and key != directory:
            total_size_dict[key] += total_size_dict[directory]

# Part 1
total = 0

# Part 2
empty_space = 70_000_000 - max(total_size_dict.values())
space_needed = 30_000_000 - empty_space

total_2 = []

for directory in total_size_dict:
    # Part 1
    if total_size_dict[directory] <= 100_000:
        total += total_size_dict[directory]
    # Part 2
    if total_size_dict[directory] >= space_needed:
        total_2.append(total_size_dict[directory])

print(total)
print(min(total_2))
