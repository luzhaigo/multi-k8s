docker build -t yaf20030918/multi-client:latest -t yaf20030918/multi-client:$SHA -f ./client/Dockerfile ./client
docker bulid -t yaf20030918/multi-server:latest -t yaf20030918/multi-server:$SHA -f ./server/Dockerfile ./server
docker build -t yaf20030918/multi-worker:latest -t yaf20030918/multi-worker:$SHA -f ./worker/Dockerfile ./worker

docker push yaf20030918/multi-client:latest 
docker push yaf20030918/multi-client:$SHA
docker push yaf20030918/multi-server:latest 
docker push yaf20030918/multi-server:$SHA
docker push yaf20030918/multi-worker:latest
docker push yaf20030918/multi-worker:$SHA

kubectl apply -f k8s
kubectl set image deployments/server-deployment server=yaf20030918/multi-server:$SHA
kubectl set image deployments/client-deployment client=yaf20030918/multi-client:$SHA
kubectl set image deployments/worker-deployment worker=yaf20030918/multi-worker:$SHA