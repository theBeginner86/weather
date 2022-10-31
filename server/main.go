package main

import (
	"context"
	"os"
	"os/signal"

	"github.com/sirupsen/logrus"

	"github.com/theBeginner86/weather/server/router"
)

func main() {
	ctx := context.Background()
	port := 8080
	r := router.NewRouter(ctx, port)
	c := make(chan os.Signal, 1)
	signal.Notify(c, os.Interrupt)

	go func() {
		logrus.Info("Weather Server listening on: ", port)
		if err := r.Run(); err != nil {
			logrus.Error("Error serving UI: ", err)
			os.Exit(1)
		}
	}()
	<-c
}