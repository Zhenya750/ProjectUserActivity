#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.


FROM mcr.microsoft.com/dotnet/aspnet:3.1 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443


FROM mcr.microsoft.com/dotnet/sdk:3.1 AS build
WORKDIR /src
COPY ["ProjectUserActivity/ProjectUserActivity.csproj", "ProjectUserActivity/"]
RUN dotnet restore "ProjectUserActivity/ProjectUserActivity.csproj"
COPY . .
WORKDIR "/src/ProjectUserActivity"
RUN dotnet build "ProjectUserActivity.csproj" -c Release -o /app/build


FROM build AS publish
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get install -y nodejs
RUN dotnet publish "ProjectUserActivity.csproj" -c Release -o /app/publish


FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "ProjectUserActivity.dll"]