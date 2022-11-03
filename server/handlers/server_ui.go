package handlers

import (
	"net/http"
	"path/filepath"
	"strings"
	// "os"

	"github.com/sirupsen/logrus"
)

func ServeUI(w http.ResponseWriter, r *http.Request, reqBasePath, baseFolderPath string) {
	// home, err := os.UserHomeDir()
	// if err != nil {
	// 	logrus.Error("Error getting user home directory: ", err)
	// 	http.Error(w, "Error getting user home directory", http.StatusInternalServerError)
	// 	return
	// }
	reqURL := r.URL.Path
	reqURL = strings.Replace(reqURL, reqBasePath, "", 1)

	var filePath strings.Builder

	filePath.WriteString(reqURL)
	if reqURL == "/" || reqURL == "" {
		filePath.WriteString("index.html")
	} else if filepath.Ext(reqURL) == "" {
		filePath.WriteString(".html")
	}

	// finalPath := filepath.Join(baseFolderPath, filePath.String())
	logrus.Infof("Serving file: %s", "/Users/pranavsingh/Documents/OS/Internal/weather/ui/out"+filePath.String())
	http.ServeFile(w, r, "/Users/pranavsingh/Documents/OS/Internal/weather/ui/out"+filePath.String())
}
