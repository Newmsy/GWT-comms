FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 7065 7066

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["Hybrid.Working.Web.csproj", "."]
COPY ["../Hybrid.Working.Application/Hybrid.Working.Application.csproj", "../Hybrid.Working.Application/"]
COPY ["../Hybrid.Working.Domain/Hybrid.Working.Domain.csproj", "../Hybrid.Working.Domain/"]
COPY ["../Hybrid.Working.Infrastructure/Hybrid.Working.Infrastructure.csproj", "../Hybrid.Working.Infrastructure/"]
RUN dotnet restore "./Hybrid.Working.Web.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "Hybrid.Working.Web.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Hybrid.Working.Web.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Hybrid.Working.Web.dll"]