from db.models import Competition

comp: list[Competition] = [
    {
        "id": "473ec02b-0151-4dc2-82c8-8569eeeb9e40",
        "name": "Test Competition",
        "users": ["Ant", "Jon", "Meg"],
    }
]

print(comp)
# op.execute(Competition, [{"id": "473ec02b-0151-4dc2-82c8-8569eeeb9e40", "name": "Test Competition", "users": ["Ant", "Jon", "Meg"]}]
#                )
