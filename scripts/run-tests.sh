#!/bin/bash

printFileFailedTest () {
  printf "\e[38;5;196m\e[48;5;0mTest \e[1;38m$1\e[0m\e[38;5;196m\e[48;5;0m failed!\e[0m\n"
}

TESTS_FAILED=false

# all these tests must pass compilation
for FILE in $(ls test/**/*.spec.ts)
do
  tsc --noEmit $FILE > /dev/null
  if [ $? -ne 0 ]; then
    TESTS_FAILED=true
    printFileFailedTest $FILE
  fi
done

if $TESTS_FAILED; then
  exit 1
else
  printf "\e[0;32m\e[48;5;0mAll tests passed.\e[0m\n"
  exit 0
fi
