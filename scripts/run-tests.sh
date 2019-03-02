#!/bin/bash

# all these tests must pass compilation
tsc --noEmit $(ls test/should-pass/*.ts) > /dev/null
if [ $? -ne 0 ]; then
  printf '\e[38;5;196m\e[48;5;0mA test failed!\n\e[0m'
  exit 1
fi

# each of these tests must fail compilation
for FILE in $(ls test/should-fail/*.ts)
do
  tsc --noEmit $FILE > /dev/null
  if [ $? -eq 0 ]; then
    printf '\e[38;5;196m\e[48;5;0mA test failed!\n\e[0m'
    exit 1
  fi
done

printf '\e[0;32m\e[48;5;0mAll tests passed.\n\e[0m'
exit 0
