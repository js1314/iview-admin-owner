@echo off

echo SVN Update...
svn update

echo Building...
cross-env NODE_ENV=development npm run dev
