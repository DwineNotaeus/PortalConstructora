export class Projects {
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

    /**
     *
     */
    // constructor(public RadicadoBanco: string = null) {        
    // }
}

export class ProjectsIds {
    public codigo: number;
    public isAll: boolean;
    public projectsCode: Array<number>;    
}