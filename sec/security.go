package sec


import (
	"net/http"
)

// https://www.slideshare.net/fabpot/caching-on-the-edge
func addSecurityHeaders(w http.ResponseWriter) {
	// w.Header().Set("X-Content-Type-Options", "nosniff")
	// w.Header().Set("X-XSS-Protection", "1; mode=block")
	// w.Header().Set("X-Frame-Options", "SAMEORIGIN")
	// w.Header().Set("Strict-Transport-Security", "max-age=2592000; includeSubDomains")
	// // no cache remove for production
	// w.Header().Set("Expires", "Tue, 03 Jul 2001 06:00:00 GMT")
	// w.Header().Set("Last-Modified", "{now} GMT")
	// w.Header().Set("Cache-Control", "max-age=0, must-revalidate, proxy-revalidate")

	headers := w.Header()
	headers.Add("Access-Control-Allow-Origin", "*")
	headers.Add("Vary", "Origin")
	headers.Add("Vary", "Access-Control-Request-Method")
	headers.Add("Vary", "Access-Control-Request-Headers")
	headers.Add("Access-Control-Allow-Headers", "Content-Type, Origin, Accept, token")
	headers.Add("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
}

func Preflight(res http.ResponseWriter, req *http.Request) (isPreflight bool) {
	addSecurityHeaders(res)
	isPreflight = false
	if req.Method == "OPTIONS" {
		res.WriteHeader(http.StatusOK)
		isPreflight = true
	}
	return
}