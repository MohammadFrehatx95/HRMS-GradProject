FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy csproj and restore as distinct layers
COPY ["HRMS-GradProject/HRMS_API.csproj", "HRMS-GradProject/"]
COPY ["Application/Application.csproj", "Application/"]
COPY ["Domain/Domain.csproj", "Domain/"]
COPY ["Infrastructure/Infrastructure.csproj", "Infrastructure/"]
RUN dotnet restore "HRMS-GradProject/HRMS_API.csproj"

# Copy everything else and build
COPY . .
WORKDIR "/src/HRMS-GradProject"
RUN dotnet build "HRMS_API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "HRMS_API.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=publish /app/publish .

# Expose port for Render
EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080

ENTRYPOINT ["dotnet", "HRMS_API.dll"]
