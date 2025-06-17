{ pkgs, ... }: {
  channel = "stable-24.11";

  packages = [ pkgs.nodejs_20 pkgs.git ];

  idx.workspace.onCreate = {
    npm-install = "npm install";   # nombre arbitrario de la tarea
  };

  idx.previews = {
    enable = true;
    previews.web = {
      command = [
        "npm" "run" "dev" "--"
        "--host" "0.0.0.0"
        "--port" "$PORT"
      ];
      manager = "web";
    };
  };
}


