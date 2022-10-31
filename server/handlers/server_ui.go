package handlers

import (
	"net/http"
	"path/filepath"
	"strings"

	"github.com/sirupsen/logrus"
)

func ServeUI(w http.ResponseWriter, r *http.Request, reqBasePath, baseFolderPath string) {
	reqURL := r.URL.Path
	reqURL = strings.Replace(reqURL, reqBasePath, "", 1)

	var filePath strings.Builder

	filePath.WriteString(reqURL)
	if reqURL == "/" || reqURL == "" {
		filePath.WriteString("index.html")
	} else if filepath.Ext(reqURL) == "" {
		filePath.WriteString(".html")
	}

	logrus.Infof("Serving file: %s", filePath.String())
	finalPath := filepath.Join(baseFolderPath, filePath.String())
	http.ServeFile(w, r, finalPath)
}
