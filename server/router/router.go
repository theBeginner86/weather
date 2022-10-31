package router

import (
	"fmt"
	"net/http"
	"context"

	"github.com/gorilla/mux"

	"github.com/theBeginner86/weather/server/handlers"
)

type Router struct {
	S    *mux.Router
	port int
}

func NewRouter(ctx context.Context, port int) *Router {
	gMux := mux.NewRouter()

	gMux.PathPrefix("/").
		Handler(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			handlers.ServeUI(w, r, "", "../../ui/out/")
		})).
		Methods("GET")

	return &Router{
		S:    gMux,
		port: port,
	}
}


// Run starts the http server
func (r *Router) Run() error {
	return http.ListenAndServe(fmt.Sprintf(":%d", r.port), r.S)
}

