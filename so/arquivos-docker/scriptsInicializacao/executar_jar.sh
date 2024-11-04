#!/bin/bash


#criando loop para rodar o jar

while true; do
	java -jar ./classe-logv2-1.0-SNAPSHOT-jar-with-dependencies.jar
	sleep 10 #intervalo de 5 minutos antes de reiniciar
done

