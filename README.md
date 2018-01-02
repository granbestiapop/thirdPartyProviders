# Third Party Integration

```  
   npm install
   npm run dev
``` 

Put MERCADOPAGO_SECRET credentials on .env file and then:
```
   # Avoids track changes of .env file
   git update-index --assume-unchanged .env
```

GO: http://localhost:3000/

# Docker
Update MERCADOPAGO_SECRET token on Dockerfile.

```
   docker build . -t thirdpartyapp
   docker run -p3000:3000 --rm -it thirdpartyapp

``` 

http://localhost:3000/
