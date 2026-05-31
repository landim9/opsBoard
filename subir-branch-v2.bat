@echo off
setlocal enabledelayedexpansion

cd /d "%~dp0"
color 0A

echo ==============================================
echo        AUTO GIT PUSH V2 - RAFAEL FLOW

echo ==============================================

echo.
where git >nul 2>nul
if errorlevel 1 (
  echo [ERRO] Git nao encontrado no PATH.
  pause
  exit /b 1
)

if not exist ".git" (
  echo [ERRO] Esta pasta nao parece ser um repositorio Git.
  echo Coloque este arquivo na raiz do projeto.
  pause
  exit /b 1
)

for /f "delims=" %%i in ('git branch --show-current') do set CURRENT_BRANCH=%%i

if "%CURRENT_BRANCH%"=="" (
  echo [ERRO] Nao foi possivel identificar a branch atual.
  pause
  exit /b 1
)

echo Branch atual: %CURRENT_BRANCH%
echo.
echo Escolha a branch de destino:
echo [1] Usar branch atual (%CURRENT_BRANCH%)
echo [2] main
echo [3] dev
echo [4] Digitar outra
set /p OPTION=Opcao: 

if "%OPTION%"=="1" set BRANCH=%CURRENT_BRANCH%
if "%OPTION%"=="2" set BRANCH=main
if "%OPTION%"=="3" set BRANCH=dev
if "%OPTION%"=="4" (
  set /p BRANCH=Digite o nome da branch: 
)

if "%BRANCH%"=="" set BRANCH=%CURRENT_BRANCH%

echo.
echo Branch alvo: %BRANCH%
echo.

echo Status atual:
git status --short

echo.
choice /M "Deseja fazer git pull antes do push"
if errorlevel 2 goto skip_pull
if errorlevel 1 goto do_pull

do_pull
echo.
echo Atualizando branch %BRANCH%...
git pull origin %BRANCH%
if errorlevel 1 (
  echo [AVISO] O git pull falhou. Verifique conflitos ou a existencia da branch remota.
  echo.
  choice /M "Deseja continuar mesmo assim"
  if errorlevel 2 (
    pause
    exit /b 1
  )
)

:skip_pull
echo.
set /p CUSTOM_MSG=Digite a mensagem do commit ^(ou deixe vazio para automatica^): 

if "%CUSTOM_MSG%"=="" (
  for /f %%i in ('powershell -NoProfile -Command "Get-Date -Format yyyy-MM-dd_HH-mm-ss"') do set NOW=%%i
  set MSG=update %NOW%
) else (
  set MSG=%CUSTOM_MSG%
)

echo.
echo Fazendo checkout da branch %BRANCH%...
git checkout %BRANCH%
if errorlevel 1 (
  echo [ERRO] Nao foi possivel mudar para a branch %BRANCH%.
  pause
  exit /b 1
)

echo.
echo Adicionando arquivos...
git add .
if errorlevel 1 (
  echo [ERRO] Falha no git add.
  pause
  exit /b 1
)

echo.
echo Criando commit...
git commit -m "%MSG%"
if errorlevel 1 (
  echo [AVISO] Nenhuma alteracao nova para commit ou ocorreu algum erro no commit.
)

echo.
echo Enviando para origin/%BRANCH%...
git push -u origin %BRANCH%
if errorlevel 1 (
  echo [ERRO] Falha no git push.
  pause
  exit /b 1
)

echo.
echo ==============================================
echo [OK] Push concluido com sucesso.
echo Branch: %BRANCH%
echo Commit: %MSG%
echo ==============================================
pause
endlocal
