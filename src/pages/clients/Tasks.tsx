import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { Plus, LogOut, Search, Calendar } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
// import { CreateIncidenciaDialog } from "@/components/CreateIncidenciaDialog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Incidencia {
  id: string;
  titulo: string;
  descripcion: string;
  archivos_adjuntos: any;
  created_at: string;
}

const ITEMS_PER_PAGE = 10;

const Tasks = () => {
  const [incidencias, setIncidencias] = useState<Incidencia[]>([]);
  const [filteredIncidencias, setFilteredIncidencias] = useState<Incidencia[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchTitulo, setSearchTitulo] = useState("");
  const [searchFecha, setSearchFecha] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();


  useEffect(() => {
    checkAuth();
    loadIncidencias();
  }, []);

  useEffect(() => {
    filterIncidencias();
  }, [searchTitulo, searchFecha, incidencias]);

  const checkAuth = async () => {
    // const { data: { session } } = await supabase.auth.getSession();
    // if (!session) {
    //   navigate("/auth");
    // }
  };

  const loadIncidencias = async () => {
    setLoading(true);
    // const { data, error } = await supabase
    //   .from("incidencias")
    //   .select("*")
    //   .order("created_at", { ascending: false });

    // if (error) {
    //   toast({
    //     title: "Error",
    //     description: "No se pudieron cargar las incidencias",
    //     variant: "destructive",
    //   });
    // } else {
    //   setIncidencias(data || []);
    // }
    setLoading(false);
  };

  const filterIncidencias = () => {
    let filtered = [...incidencias];

    if (searchTitulo) {
      filtered = filtered.filter((inc) =>
        inc.titulo.toLowerCase().includes(searchTitulo.toLowerCase())
      );
    }

    if (searchFecha) {
      filtered = filtered.filter((inc) =>
        format(new Date(inc.created_at), "yyyy-MM-dd").includes(searchFecha)
      );
    }

    setFilteredIncidencias(filtered);
    setCurrentPage(1);
  };

  const handleLogout = async () => {
    // await supabase.auth.signOut();
    navigate("/auth");
  };

  const totalPages = Math.ceil(filteredIncidencias.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedIncidencias = filteredIncidencias.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-accent/20">
      <Toaster />
      <div className="container mx-auto p-4 md:p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Gestión de Incidencias</h1>
            <p className="text-muted-foreground mt-2">Administra y registra incidencias</p>
          </div>
          <Button onClick={handleLogout} variant="outline" size="sm">
            <LogOut className="mr-2 h-4 w-4" />
            Salir
          </Button>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Filtros</CardTitle>
            <CardDescription>Busca incidencias por título o fecha</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por título..."
                value={searchTitulo}
                onChange={(e) => setSearchTitulo(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex-1 relative">
              <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="date"
                value={searchFecha}
                onChange={(e) => setSearchFecha(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button onClick={() => setDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Nueva Incidencia
            </Button>
          </CardContent>
        </Card>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Cargando incidencias...</p>
          </div>
        ) : filteredIncidencias.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No se encontraron incidencias</p>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="grid gap-4">
              {paginatedIncidencias.map((incidencia) => (
                <Card key={incidencia.id} className="hover-scale">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{incidencia.titulo}</CardTitle>
                        <CardDescription>
                          {format(new Date(incidencia.created_at), "PPP 'a las' p", { locale: es })}
                        </CardDescription>
                      </div>
                      {incidencia.archivos_adjuntos?.length > 0 && (
                        <span className="text-sm text-muted-foreground">
                          {incidencia.archivos_adjuntos.length} archivo(s)
                        </span>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{incidencia.descripcion}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-6">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                      />
                    </PaginationItem>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          onClick={() => setCurrentPage(page)}
                          isActive={currentPage === page}
                          className="cursor-pointer"
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext
                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </>
        )}

        {/* <CreateIncidenciaDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          onSuccess={loadIncidencias}
        /> */}
      </div>
    </div>
  );
};

export default Tasks;