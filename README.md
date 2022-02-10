# hybrid-working

## macOS https setup

```
dotnet dev-certs https -ep ${HOME}/.aspnet/https/aspnetapp.pfx -p Password123!
dotnet dev-certs https --trust
```

## API Endpoints

Get event calendar (GET)

```
~/api/CalendarEvent/{event calendar ID | GUID}
```

Create event calendar (POST)

```
~/api/CalendarEvent
Body
{
EventJson: string
}
```
