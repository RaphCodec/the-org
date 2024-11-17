import polars as pl
from faker import Faker
from faker.providers import BaseProvider
from icecream import ic

# class CSuiteProvider(BaseProvider):
#     def c_suite_title(self):

#         return self.random_element(c_suite_titles)


def main():
    Faker.seed(0)
    fake = Faker()

    c_suite_titles = {
        "EmpID": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        "title": [
            "CEO (Chief Executive Officer)",
            "CFO (Chief Financial Officer)",
            "COO (Chief Operating Officer)",
            "CTO (Chief Technology Officer)",
            "CIO (Chief Information Officer)",
            "CMO (Chief Marketing Officer)",
            "CHRO (Chief Human Resources Officer)",
            "CPO (Chief Product Officer)",
            "CSO (Chief Strategy Officer)",
            "CISO (Chief Information Security Officer)",
            "CDO (Chief Data Officer)",
        ],
        "reports_to": [None, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    }

    vp_to_c_suite = {
        "EmpID": list(range(12, 42)),
        "title": [
            "VP of Sales",
            "VP of Marketing",
            "VP of Engineering",
            "VP of Product",
            "VP of Finance",
            "VP of Operations",
            "VP of Human Resources",
            "VP of Customer Success",
            "VP of Business Development",
            "VP of Strategy",
            "VP of Technology",
            "VP of Information Technology",
            "VP of Data",
            "VP of Analytics",
            "VP of Research and Development",
            "VP of Supply Chain",
            "VP of Manufacturing",
            "VP of Quality",
            "VP of Legal",
            "VP of Compliance",
            "VP of Risk Management",
            "VP of Corporate Development",
            "VP of Investor Relations",
            "VP of Communications",
            "VP of Public Relations",
            "VP of Government Affairs",
            "VP of Environmental Health and Safety",
            "VP of Facilities",
            "VP of Procurement",
            "VP of Innovation",
        ],
        "reports_to": [
            6,  # CMO (Chief Marketing Officer)
            6,  # CMO (Chief Marketing Officer)
            4,  # CTO (Chief Technology Officer)
            8,  # CPO (Chief Product Officer)
            2,  # CFO (Chief Financial Officer)
            3,  # COO (Chief Operating Officer)
            7,  # CHRO (Chief Human Resources Officer)
            3,  # COO (Chief Operating Officer)
            9,  # CSO (Chief Strategy Officer)
            9,  # CSO (Chief Strategy Officer)
            4,  # CTO (Chief Technology Officer)
            5,  # CIO (Chief Information Officer)
            11, # CDO (Chief Data Officer)
            11, # CDO (Chief Data Officer)
            4,  # CTO (Chief Technology Officer)
            3,  # COO (Chief Operating Officer)
            3,  # COO (Chief Operating Officer)
            3,  # COO (Chief Operating Officer)
            2,  # CFO (Chief Financial Officer)
            2,  # CFO (Chief Financial Officer)
            2,  # CFO (Chief Financial Officer)
            9,  # CSO (Chief Strategy Officer)
            2,  # CFO (Chief Financial Officer)
            6,  # CMO (Chief Marketing Officer)
            6,  # CMO (Chief Marketing Officer)
            9,  # CSO (Chief Strategy Officer)
            3,  # COO (Chief Operating Officer)
            3,  # COO (Chief Operating Officer)
            3,  # COO (Chief Operating Officer)
            4,  # CTO (Chief Technology Officer)
        ],
    }

    director_to_vp = {
        "EmpID": list(range(42, 109)),
        "title": [
            "Director of Sales",
            "Director of Marketing",
            "Director of Engineering",
            "Director of Product",
            "Director of Finance",
            "Director of Operations",
            "Director of Human Resources",
            "Director of Customer Success",
            "Director of Business Development",
            "Director of Strategy",
            "Director of Technology",
            "Director of Information Technology",
            "Director of Data",
            "Director of Analytics",
            "Director of Research and Development",
            "Director of Supply Chain",
            "Director of Manufacturing",
            "Director of Quality",
            "Director of Legal",
            "Director of Compliance",
            "Director of Risk Management",
            "Director of Corporate Development",
            "Director of Investor Relations",
            "Director of Communications",
            "Director of Public Relations",
            "Director of Government Affairs",
            "Director of Environmental Health and Safety",
            "Director of Facilities",
            "Director of Procurement",
            "Director of Innovation",
            "Director of IT Security",
            "Director of Software Development",
            "Director of Hardware Development",
            "Director of Network Operations",
            "Director of Technical Support",
            "Director of Customer Service",
            "Director of Sales Operations",
            "Director of Marketing Operations",
            "Director of Product Management",
            "Director of Financial Planning",
            "Director of Accounting",
            "Director of Treasury",
            "Director of Tax",
            "Director of Internal Audit",
            "Director of External Audit",
            "Director of Investor Relations",
            "Director of Corporate Communications",
            "Director of Media Relations",
            "Director of Community Relations",
            "Director of Government Relations",
            "Director of Environmental Compliance",
            "Director of Safety",
            "Director of Security",
            "Director of Maintenance",
            "Director of Logistics",
            "Director of Distribution",
            "Director of Transportation",
            "Director of Warehousing",
            "Director of Manufacturing Operations",
            "Director of Production",
            "Director of Quality Assurance",
            "Director of Regulatory Affairs",
            "Director of Risk Assessment",
            "Director of Strategic Planning",
            "Director of Business Analysis",
            "Director of Market Research",
            "Director of Product Marketing",
        ],
        "reports_to": [
            12,  # VP of Sales
            13,  # VP of Marketing
            14,  # VP of Engineering
            15,  # VP of Product
            16,  # VP of Finance
            17,  # VP of Operations
            18,  # VP of Human Resources
            19,  # VP of Customer Success
            20,  # VP of Business Development
            21,  # VP of Strategy
            22,  # VP of Technology
            23,  # VP of Information Technology
            24,  # VP of Data
            25,  # VP of Analytics
            26,  # VP of Research and Development
            27,  # VP of Supply Chain
            28,  # VP of Manufacturing
            29,  # VP of Quality
            30,  # VP of Legal
            31,  # VP of Compliance
            32,  # VP of Risk Management
            33,  # VP of Corporate Development
            34,  # VP of Investor Relations
            35,  # VP of Communications
            36,  # VP of Public Relations
            37,  # VP of Government Affairs
            38,  # VP of Environmental Health and Safety
            39,  # VP of Facilities
            40,  # VP of Procurement
            41,  # VP of Innovation
            23,  # VP of Information Technology
            14,  # VP of Engineering
            14,  # VP of Engineering
            23,  # VP of Information Technology
            19,  # VP of Customer Success
            19,  # VP of Customer Success
            12,  # VP of Sales
            13,  # VP of Marketing
            15,  # VP of Product
            16,  # VP of Finance
            16,  # VP of Finance
            16,  # VP of Finance
            16,  # VP of Finance
            16,  # VP of Finance
            34,  # VP of Investor Relations
            35,  # VP of Communications
            36,  # VP of Public Relations
            37,  # VP of Government Affairs
            38,  # VP of Environmental Health and Safety
            38,  # VP of Environmental Health and Safety
            39,  # VP of Facilities
            39,  # VP of Facilities
            27,  # VP of Supply Chain
            27,  # VP of Supply Chain
            27,  # VP of Supply Chain
            27,  # VP of Supply Chain
            28,  # VP of Manufacturing
            28,  # VP of Manufacturing
            29,  # VP of Quality
            31,  # VP of Compliance
            32,  # VP of Risk Management
            21,  # VP of Strategy
            21,  # VP of Strategy
            13,  # VP of Marketing
            13,  # VP of Marketing
            13,  # VP of Marketing
            13,  # VP of Marketing
        ],
    }

    titles = pl.concat([pl.DataFrame(c_suite_titles), pl.DataFrame(vp_to_c_suite), pl.DataFrame(director_to_vp)])

    # fake.add_provider(CSuiteProvider)
    # c_suite_titles = [fake.c_suite_title() for _ in range(12)]

    data = pl.DataFrame(
        {
            "EmpID": [num for num in range(1, 10_000)],
            "first_name": [fake.first_name() for _ in range(1, 10_000)],
            "last_name": [fake.last_name() for _ in range(1, 10_000)],
            "age": [fake.random_int(min=18, max=80, step=1) for _ in range(1, 10_000)],
            "city": [fake.city() for _ in range(1, 10_000)],
            "phone_number": [fake.basic_phone_number() for _ in range(1, 10_000)],
            "job": [fake.job() for _ in range(1, 10_000)],
            "salary": [fake.random_int(min=50_000, max=500_000, step=1) for _ in range(1, 10_000)],
        }
    ).with_columns(
        (
            pl.col("first_name").str.slice(0, 1) + pl.col("last_name") + "@iwork.com"
        ).alias("email"),
        (pl.col("last_name") + ", " + pl.col("first_name")).alias("full_name"),
        pl.when(pl.col("EmpID") == 1)
        .then(pl.lit("CEO (Chief Executive Officer)"))
        .otherwise(pl.col("job"))
        .alias("job"),
        pl.when(pl.col("EmpID") == 1)
        .then(pl.lit(550_000))
        .otherwise(pl.col("salary"))
        .alias("salary"),
    )
    # Create a DataFrame for the hierarchy
    hierarchy = pl.DataFrame({
        "EmpID": [num for num in range(1, 10_000)],
        "reports_to": [None] + [fake.random_int(min=1, max=1_600) for _ in range(1, 9_999)]
    })

    # Ensure the CEO has no supervisor
    hierarchy = hierarchy.with_columns(
        pl.when(pl.col("EmpID") == 1).then(pl.lit(None)).otherwise(pl.col("reports_to")).alias("reports_to")
    )

    # Join the hierarchy with the data
    data = data.join(hierarchy, on="EmpID", how="left")

    ic(data)


    data.write_csv("data.csv")


if __name__ == "__main__":
    main()
