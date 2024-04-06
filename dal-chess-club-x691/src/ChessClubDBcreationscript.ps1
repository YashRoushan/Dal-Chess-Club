# Set variables for remote database connection
$env:remoteHost = "euro.cs.dal.ca"
$env:remotePort = "22"
$env:remoteUser = "chessclub"
$env:remotePassword = $env:REMOTE_DB_PASSWORD #env variables must be set up on one's personal machine
$env:remoteDatabase = "chessclub"


#env: Set variables for local database connection
$env:localHost = "localhost"
$env:localUser = "root"
$env:localPort = "3306"
$env:localPassword = $env:LOCAL_DB_PASSWORD #env variables must be set up on one's personal machine
$env:localDatabase = "localDB"


$env:mysqldumpPath = "C:\Program Files\MySQL\MySQL Workbench 8.0 CE\mysqldump.exe"
$env:mysqlPath = "C:\Program Files\MySQL\MySQL Workbench 8.0 CE\mysql.exe"

Write-Host "& $env:mysqldumpPath --host=$env:remoteHost --port=$env:remotePort --user=$env:remoteUser --password=$env:remotePassword $env:remoteDatabase > remote_dump.sql"

# Dump remote database to SQL file
& $env:mysqldumpPath --host=$env:remoteHost --port=$env:remotePort --user=$env:remoteUser --password=$env:remotePassword $env:remoteDatabase > remote_dump.sql

# Create local database
& $env:mysqlPath --host=$env:localHost --port=$env:localPort --user=$env:localUser --password=$env:localPassword --execute="CREATE DATABASE IF NOT EXISTS $env:localDatabase"

# Import dump into local database
Get-Content remote_dump.sql | & $env:mysqlPath --host=$env:localHost --port=$env:localPort --user=$env:localUser --password=$env:localPassword --database=$env:localDatabase

Write-Output "Database transfer complete."