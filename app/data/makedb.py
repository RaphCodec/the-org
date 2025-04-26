import sqlite3
import os

# Define paths
project_root = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sqlite_db_path = os.path.join(project_root, "database.db")

# Embedded JSON data as a dictionary
data = [
    {
        "id": "1",
        "name": "Bruce Wayne",
        "position": "The Damn Best",
        "salary": 1000000000,
        "image": "https://robohash.org/brucewayne?bgset=bg2"
    },
    {
        "id": "2",
        "parentId": "1",
        "name": "Diana Prince",
        "position": "Chief Badass In Charge",
        "salary": 687000,
        "image": "https://robohash.org/dianaprince?bgset=bg2"
    },
    {
        "id": "3",
        "parentId": "2",
        "name": "Harleen Quinzel",
        "position": "Crazy Sanity Keeper",
        "salary": 182000,
        "image": "https://robohash.org/harleenquinzel?bgset=bg2"
    },
    {
        "id": "4",
        "parentId": "1",
        "name": "Wally West",
        "position": "Quick Fixer",
        "salary": 542000,
        "image": "https://robohash.org/wallywest?bgset=bg2"
    },
    {
        "id": "5",
        "parentId": "1",
        "name": "Jon Stewart",
        "position": "Light In The Dark",
        "salary": 558000,
        "image": "https://robohash.org/jonstewart?bgset=bg2"
    },
    {
        "id": "6",
        "parentId": "1",
        "name": "Shayera Hol",
        "position": "Firece Angel",
        "salary": 563000,
        "image": "https://robohash.org/shayerahol?bgset=bg2"
    },
    {
        "id": "7",
        "parentId": "1",
        "name": "Clark Kent",
        "position": "Mister Invincible",
        "salary": 695000,
        "image": "https://robohash.org/clarkkent?bgset=bg2"
    },
    {
        "id": "8",
        "parentId": "10",
        "name": "Victor Stone",
        "position": "Charismatic Machine",
        "salary": 168000,
        "image": "https://robohash.org/victorstone?bgset=bg2"
    },
    {
        "id": "9",
        "parentId": "10",
        "name": "Damian Wayne",
        "position": "Heir to the Throne",
        "salary": 172000,
        "image": "https://robohash.org/damianwayne?bgset=bg2"
    },
    {
        "id": "10",
        "parentId": "1",
        "name": "Dick Grayson",
        "position": "The Original",
        "salary": 575000,
        "image": "https://robohash.org/dickgrayson?bgset=bg2"
    },
    {
        "id": "11",
        "parentId": "10",
        "name": "Barbara Gordon",
        "position": "The Answer",
        "salary": 582000,
        "image": "https://robohash.org/barbaragordon?bgset=bg2"
    },
    {
        "id": "12",
        "parentId": "1",
        "name": "J'onn J'onzz",
        "position": "Shape Shifter",
        "salary": 568000,
        "image": "https://robohash.org/jonnjonzz?bgset=bg2"
    },
    {
        "id": "13",
        "parentId": "10",
        "name": "Garfield Logan",
        "position": "Personal Zoo Keeper",
        "salary": 165000,
        "image": "https://robohash.org/garfieldlogan?bgset=bg2"
    },
    {
        "id": "14",
        "parentId": "10",
        "name": "Rachel Roth",
        "position": "Spell Binder",
        "salary": 171000,
        "image": "https://robohash.org/rachelroth?bgset=bg2"
    },
    {
        "id": "15",
        "parentId": "10",
        "name": "Koriand'r (Kory) Anders",
        "position": "Fire Flyer",
        "salary": 169000,
        "image": "https://robohash.org/koryanders?bgset=bg2"
    },
    {
        "id": "16",
        "parentId": "12",
        "name": "Megan Morse",
        "position": "Junior Shape Shifter",
        "salary": 158000,
        "image": "https://robohash.org/meganmorse?bgset=bg2"
    },
    {
        "id": "17",
        "parentId": "2",
        "name": "Dinah Lance",
        "position": "Kick Butt Singer",
        "salary": 178000,
        "image": "https://robohash.org/dinahlance?bgset=bg2"
    },
    {
        "id": "18",
        "parentId": "7",
        "name": "Conner Kent",
        "position": "Genetic Strong Boy",
        "salary": 162000,
        "image": "https://robohash.org/connerkent?bgset=bg2"
    },
    {
        "id": "19",
        "parentId": "8",
        "name": "Jaime Reyes",
        "position": "Alein Tech Support",
        "salary": 152000,
        "image": "https://robohash.org/jaimereyes?bgset=bg2"
    },
    {
        "id": "20",
        "parentId": "1",
        "name": "Arthur Curry",
        "position": "The Great Fish Man",
        "salary": 678000,
        "image": "https://robohash.org/arthurcurry?bgset=bg2"
    },
    {
        "id": "21",
        "parentId": "2",
        "name": "Oliver Queen",
        "position": "The Hooded Bow",
        "salary": 579000,
        "image": "https://robohash.org/oliverqueen?bgset=bg2"
    },
    {
        "id": "22",
        "parentId": "5",
        "name": "Hal Jordan",
        "position": "The Original Emerald Knight",
        "salary": 581000,
        "image": "https://robohash.org/haljordan?bgset=bg2"
    },
    {
        "id": "23",
        "parentId": "7",
        "name": "Kara Zor-El",
        "position": "Pretty Powerful",
        "salary": 685000,
        "image": "https://robohash.org/karazor-el?bgset=bg2"
    },
    {
        "id": "24",
        "parentId": "6",
        "name": "Kent Nelson",
        "position": "The Moody Socerer",
        "salary": 573000,
        "image": "https://robohash.org/kentnelson?bgset=bg2"
    },
    {
        "id": "25",
        "parentId": "6",
        "name": "Ray Palmer",
        "position": "The Small Package",
        "salary": 577000,
        "image": "https://robohash.org/raypalmer?bgset=bg2"
    }
]

# Connect to SQLite database
conn = sqlite3.connect(sqlite_db_path)
cursor = conn.cursor()

# Create table
cursor.execute("""
CREATE TABLE IF NOT EXISTS heroes (
    id INTEGER PRIMARY KEY,
    parentId INTEGER,
    name TEXT NOT NULL,
    position TEXT NOT NULL,
    salary INTEGER NOT NULL,
    image TEXT NOT NULL
)
""")

# Insert data into the table
for entry in data:
    cursor.execute("""
    INSERT INTO heroes (id, parentId, name, position, salary, image)
    VALUES (?, ?, ?, ?, ?, ?)
    """, (
        entry["id"],
        entry.get("parentId"),  # Use .get() to handle missing parentId
        entry["name"],
        entry["position"],
        entry["salary"],
        entry["image"]
    ))

# Commit and close the connection
conn.commit()
conn.close()

print(f"SQLite database created at {sqlite_db_path}")