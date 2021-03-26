export class Projects {
    // tab-1
    public Nombre: string;
    public IdConstructora: number;
    public CodigoConstructora: number;
    public FechaEntrega: string;
    public EstratoInmueble: number;

    public CodigoRegion: number;
    public CodigoDepartamento: number;
    public CodigoCiudad: number;

    
    public IdCiudad: number;
    public Direccion: string;

    // tab-2
    public TipoProyecto: string;
    public TipoInmueble: string;
    public Etapa_Torre: string;
    public NumeroUnidades: number;
    public AvaluoTipo: string;
    public DireccionProyecto: string;
    public Instrumentador: string;


    // tab-3
    public EstadoConstruccion: string;
    public EstadoAvaluo: string;
    public EstadoEstudioTitulos: string;
    public EstadoFirmaEscrituras: string;
    public EstadoBoletaRegistrada: string;
    public EstadoEntregaVivienda: string;

    // tab-4
    public FechaAvaluo: Date;
    public FechaEstudioTitulos: Date;
    public FechaTipoEntregaInmueble: Date;
    public TipoEntregaInmueble: string;

}

export class ProjectsIds {
    public codigo: number;
    public isAll: boolean;
    public projectsCode: Array<number>;
}


export class searchByProject {
    public NombreProyecto: string;
    public DireccionProyecto: string;
    public IdentificacionCliente: string;
    public NombreCliente: string;
    public CorreoElectronicoCliente: string;
    public RadicadoBanco: string;
    public UsuarioInstrumentador: string;
    public FechaReagendamiento: Date;
    public DetalleObservacion: string;
    public Novedad: string;
    public TipoProducto: string;
    public EtapaBizagi: string;
    public Evaluate: string;
    public Registration: string;
    public DeliveryCertificate: string;
    public Other: string;
    public Constructora: string;
    public Approval: string;
    public Ratification: string;
    public ApprovalDocumentName: string;
    public RatificationDocumentName: string;
    public DocumentRoute: string;
    public MontoAprobado: string;
}



export class contactsByProject {
    // public IdContactos: string;
    // public IdProyecto: string;
    // public IdConstructora: string;
    public IdRegion: number;
    public NombreContacto: string;
    public Email: string;
    public Direccion: string;
    public TelefonoFijo: string;
    public Celular: string;
    public IdTipoContacto: number;
    // public EstadoContacto: string;
}