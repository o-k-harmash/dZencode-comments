# BUILD ERROR: [api build 8/8] RUN dotnet publish -c release -o /app --no-restore:
# 1.149 /usr/share/dotnet/sdk/9.0.314/Sdks/Microsoft.NET.Sdk/targets/Microsoft.PackageDependencyResolution.targets(266,5) 
# :error MSB4018: The "ResolvePackageAssets" task failed unexpectedly. [/source/src/api.csproj]
# SOLUTION: clear bin and obj folders in api/src before docker-compose run 

# https://hub.docker.com/_/microsoft-dotnet
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /source

# copy csproj and restore as distinct layers
COPY *.sln .
COPY src/*.csproj ./src/
RUN dotnet restore

# copy everything else and build app
COPY src/. ./src/
WORKDIR /source/src
RUN dotnet publish -c release -o /app --no-restore

# final stage/image
FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app
COPY --from=build /app ./
ENTRYPOINT ["dotnet", "api.dll"]