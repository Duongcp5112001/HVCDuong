@echo off
del /S /Q .openapi-generator-vue\gen\crm
call npm run og -- generate -i openapi-gen/openapi-crm.yaml -g typescript-axios -o .openapi-generator-vue/gen/crm -t .openapi-generator-vue/typescript-axios --additional-properties=useSingleRequestParameter=true --additional-properties=supportsES6=true
del /S /Q ..\src\openapi\crm
xcopy /cs ..\.openapi-generator-vue\gen\crm\*.ts ..\src\openapi\crm
del /S /Q ..\.openapi-generator-vue\gen\crm

del /S /Q .openapi-generator-vue\gen\front
call npm run og -- generate -i openapi-gen/openapi-front.yaml -g typescript-axios -o .openapi-generator-vue/gen/front -t .openapi-generator-vue/typescript-axios --additional-properties=useSingleRequestParameter=true --additional-properties=supportsES6=true
del /S /Q ..\src\openapi\front
xcopy /cs ..\.openapi-generator-vue\gen\front\*.ts ..\src\openapi\front
del /S /Q ..\.openapi-generator-vue\gen\front

del /S /Q .openapi-generator-vue\gen\iam
call npm run og -- generate -i openapi-gen/openapi-iam.yaml -g typescript-axios -o .openapi-generator-vue/gen/iam -t .openapi-generator-vue/typescript-axios --additional-properties=useSingleRequestParameter=true --additional-properties=supportsES6=true
del /S /Q ..\src\openapi\iam
xcopy /cs ..\.openapi-generator-vue\gen\iam\*.ts ..\src\openapi\iam
del /S /Q ..\.openapi-generator-vue\gen\iam

del /S /Q .openapi-generator-vue\gen\membership
call npm run og -- generate -i openapi-gen/openapi-membership.yaml -g typescript-axios -o .openapi-generator-vue/gen/membership -t .openapi-generator-vue/typescript-axios --additional-properties=useSingleRequestParameter=true --additional-properties=supportsES6=true
del /S /Q ..\src\openapi\membership
xcopy /cs ..\.openapi-generator-vue\gen\membership\*.ts ..\src\openapi\membership
del /S /Q ..\.openapi-generator-vue\gen\membership

del /S /Q .openapi-generator-vue\gen\sysadmin
call npm run og -- generate -i openapi-gen/openapi-sysadmin.yaml -g typescript-axios -o .openapi-generator-vue/gen/sysadmin -t .openapi-generator-vue/typescript-axios --additional-properties=useSingleRequestParameter=true --additional-properties=supportsES6=true
del /S /Q ..\src\openapi\sysadmin
xcopy /cs ..\.openapi-generator-vue\gen\sysadmin\*.ts ..\src\openapi\sysadmin
del /S /Q ..\.openapi-generator-vue\gen\sysadmin