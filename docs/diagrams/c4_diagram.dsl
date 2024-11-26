workspace {
    model {
        competitionAdmin = person "Competition Admin" "Manages the competition using the UI and uploads CSV files"
        headJudge = person "Head Judge" "Reviews the scores of the judges"
        judge = person "Judge" "Inputs scores for athletes"
        athlete = person "Athlete" "Views printed PDF outputs of scores"

        externalSystem = softwareSystem "External Registration System" "Provides initial athlete and event data" {
            tags "External System"
        }

        csvFiles = softwareSystem "CSV Files" "Generated from external sign-up system" {
            tags "CSV Files"
        }

        athleteEventSystem = softwareSystem "Athlete & Event Management System" "Provides easy scoring for freestyle kayaking competitions" {
            webApp = container "React Web Application" "Provides UI for competition management, scoring, and review" "React"
            api = container "FastAPI Backend" "Handles business logic and data processing" "Python, FastAPI"
            database = container "Database" "Stores competition data, scores, and athlete information" "PostgreSQL"
        }

        externalSystem -> csvFiles "Generates initial"
        competitionAdmin -> csvFiles "Modifies"
        competitionAdmin -> athleteEventSystem "Manages competitions and uploads CSV files"
        headJudge -> athleteEventSystem "Runs the competition and reviews judges' scores"
        judge -> athleteEventSystem "Inputs scores for athletes"
        api -> athlete "Provides printed PDF outputs to"

        competitionAdmin -> webApp "Manages Competition with"
        competitionAdmin -> api "Uploads modified competition CSV files to"
        headJudge -> webApp "Reviews Judge scores with"
        judge -> webApp "Inputs scores to"
        
        webApp -> api "Makes API calls to" "JSON/HTTPS"
        api -> database "Reads from and writes to" "SQL/TCP"
        api -> csvFiles "Processes and imports data from" "File I/O"
    }

    views {
        systemContext athleteEventSystem "SystemContext" {
            include *
            autoLayout
        }

        container athleteEventSystem "Containers" {
            include *
            autoLayout
        }

        styles {
            element "Person" {
                shape Person
                background #08427b
                color #ffffff
            }
            element "Software System" {
                background #1168bd
                color #ffffff
            }
            element "Container" {
                background #438dd5
                color #ffffff
            }
            element "External System" {
                background #999999
                color #ffffff
            }
            element "CSV Files" {
                shape Folder
                background #f5da81
                color #000000
            }
        }
    }
}