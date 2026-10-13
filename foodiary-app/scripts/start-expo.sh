
#!/usr/bin/env bash

set -e

echo "🔍 Detectando IP do Windows..."

WINDOWS_IP=$(powershell.exe -NoProfile -Command '
$ip = Get-NetIPAddress -AddressFamily IPv4 -AddressState Preferred |
  Where-Object {
    $_.InterfaceAlias -notlike "*WSL*" -and
    $_.IPAddress -notlike "169.254.*" -and
    $_.IPAddress -ne "127.0.0.1"
  } |
  Where-Object {
    (Get-NetAdapter -Name $_.InterfaceAlias -ErrorAction SilentlyContinue).Status -eq "Up"
  } |
  Select-Object -First 1 -ExpandProperty IPAddress
[Console]::Write($ip)
' | tr -d '\r')

if [ -z "$WINDOWS_IP" ]; then
  echo "❌ Não foi possível detectar o IP do Windows."
  exit 1
fi

echo "✅ IP do Windows: $WINDOWS_IP"
echo "🚀 Iniciando Expo..."

export REACT_NATIVE_PACKAGER_HOSTNAME="$WINDOWS_IP"

exec pnpm exec expo start --lan "$@"
