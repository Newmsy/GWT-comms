# hybrid-working

## macOS https setup

```
dotnet dev-certs https -ep ${HOME}/.aspnet/https/aspnetapp.pfx -p Password@123
dotnet dev-certs https --trust
```

## API Endpoints

Get event calendar (GET)

```
~/api/CalendarEvent/{id | GUID}
```

Get all events calendar (GET)

```
~/api/CalendarEvent/getall/{date | DATE | Optional} (2020-12-01T00:00:00)
```

Create event calendar (POST)

```
~/api/CalendarEvent
Body
{
EventJson: string
Date: date
}
```

# Front-end

```
cd react-app
npm i
npm start
```
# GWT-comms
