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
            nginx = container "Nginx" "Reverse proxy for the web application and API" "Nginx"
        }

        # Deployment nodes
        live = deploymentEnvironment "Live" {
            dockerHost = deploymentNode "Docker Host" "" "Docker" {
                webAppContainer = containerInstance webApp
                apiContainer = containerInstance api
                databaseContainer = containerInstance database
                nginxContainer = containerInstance nginx
            }
        }

        # External data flow
        externalSystem -> csvFiles "Generates initial"
        csvFiles -> api "Provides data to" "File I/O"

        # User interactions
        competitionAdmin -> webApp "Manages competition and uploads CSV files using"
        competitionAdmin -> csvFiles "Edits and Uploads"
        webApp -> headJudge "provides Judges' scores to"
        headJudge -> judge "gives feedback to"
        judge -> webApp "Inputs scores using"

        # Internal system flow
        nginx -> webApp "Routes requests to" "HTTP"
        nginx -> api "Routes requests to" "HTTP"
        webApp -> api "Sends requests to" "JSON/HTTPS"
        api -> database "Reads from and writes to" "SQL/TCP"
        api -> webApp "Sends responses to" "JSON/HTTPS"
        
        # Output flow
        api -> athlete "Generates PDF outputs for"
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

        deployment athleteEventSystem "Live" "DockerDeployment" {
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