@echo off
set PACKAGE_NAME=%1
set PUSH_MESSAGE=%2
if "%PACKAGE_NAME%"=="" (
  echo Error: package name missing
) else (if not exist "src/packages/%PACKAGE_NAME%" (
  echo Error: package not exists
) else (
  cd src/packages/%PACKAGE_NAME%
  echo Git Pushing...
  git add *
  git commit -m %PUSH_MESSAGE%
  git push
  echo Npm Publishing...
  npm publish --access=public
))
