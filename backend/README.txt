1. Generate Secret Key
  - LC_ALL=C tr -dc A-Za-z0-9 </dev/urandom | head -c 32 ; echo ''