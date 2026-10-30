$ErrorActionPreference='Stop'
$root=Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $root
Write-Host 'CRAVIA V2 - Local setup (private secrets stay on your laptop)' -ForegroundColor Green
if(-not (Get-Command node -ErrorAction SilentlyContinue)){ throw 'Node.js 22+ required. Download from https://nodejs.org/' }
if(-not (Test-Path 'frontend/.env')){Copy-Item 'frontend/.env.example' 'frontend/.env'}
if(-not (Test-Path 'admin/.env')){Copy-Item 'admin/.env.example' 'admin/.env'}
if(-not (Test-Path 'backend/.env')) {
  $uri=Read-Host 'MongoDB Atlas URI (press Enter to use local MongoDB)' -AsSecureString
  $ptr=[Runtime.InteropServices.Marshal]::SecureStringToBSTR($uri)
  try{$mongodb=[Runtime.InteropServices.Marshal]::PtrToStringBSTR($ptr)}finally{[Runtime.InteropServices.Marshal]::ZeroFreeBSTR($ptr)}
  if([string]::IsNullOrWhiteSpace($mongodb)){$mongodb='mongodb://127.0.0.1:27017/cravia_demo'}
  $secret=& node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
  if($LASTEXITCODE -ne 0){throw 'Could not create a JWT secret'}
  $body=[IO.File]::ReadAllText((Join-Path $root 'backend/.env.example'))
  $body=$body.Replace('MONGODB_URI=mongodb://127.0.0.1:27017/cravia_demo','MONGODB_URI='+$mongodb)
  $body=$body.Replace('JWT_SECRET=REPLACE_WITH_64_CHAR_RANDOM_SECRET','JWT_SECRET='+$secret)
  [IO.File]::WriteAllText((Join-Path $root 'backend/.env'),$body,[Text.UTF8Encoding]::new($false))
  Write-Host 'Created backend/.env privately, including random JWT secret.' -ForegroundColor Green
  Write-Host 'To enable admin login, later set ADMIN_EMAIL / ADMIN_PASSWORD (12+ chars) in backend/.env.'
} else { Write-Host 'Existing backend/.env preserved. Nothing overwritten.' -ForegroundColor Yellow }
Write-Host 'Installing project dependencies (if not already installed)...'
& npm install --no-audit --no-fund
if($LASTEXITCODE -ne 0){throw 'npm install failed: check your network or Node.js installation'}
Write-Host 'Seeding demo dishes into the configured MongoDB database...'
& npm run seed
if($LASTEXITCODE -ne 0){Write-Warning 'Seed failed; check MongoDB connection. CRAVIA will still display 18 visual preview dishes while the API is offline.'}
Write-Host 'Setup complete. Double click START-WINDOWS.bat to run your app.' -ForegroundColor Green
